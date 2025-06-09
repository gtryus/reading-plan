import { useMemo, useState, useEffect } from "react";
import prayingLogo from "./assets/praying.png";
import etbLogo from "/etb-sum-25-wb.png";
import "./App.css";
import {
  Stack,
  Link,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import { questions } from "./data/questions.ts";
import Question from "./Components/Question.tsx";
import ChooseDate from "./Components/ChooseDate.tsx";
import { biblePlan } from "./data/biblePlan.ts";
import { bookNames } from "./data/bookNames.ts";

const lookupUrl = `https://www.biblegateway.com/passage/?search=`;
const versionUrl = `&version=NLT`;

const bibleUrl = `https://www.bible.com/bible/116/{0}.{1}.NLT`;

const days = ["su", "mo", "tu", "we", "th", "fr", "sa"] as const;
type DayKey = (typeof days)[number];

function App() {
  const [date, setDate] = useState<Date | null>(null);
  const [todayPlan, setTodayPlan] = useState("Mat. 1-2 ");
  const [responses, setResponses] = useState<string[]>([]);
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: isDarkMode ? "dark" : "light",
      },
    });
  }, [isDarkMode]);

  const url2 = useMemo(() => {
    return `${lookupUrl}${todayPlan}${versionUrl}`;
  }, [todayPlan]);

  const url3 = useMemo(() => {
    const m = /^([1-4]? ?[A-Za-z]+).? ?([0-9]+)/.exec(todayPlan.trim());
    const book = m?.[1];
    const chapters = m?.[2];
    const findCode = bookNames.find(item => item.short.startsWith(book || "xyz"));
    return bibleUrl.replace("{0}", findCode?.code || "xyz").replace("{1}", chapters || "xyz");
  }, [todayPlan]);

  const handleQuestionChange = (
    date: Date | null,
    num: string,
    value: string
  ) => {
    localStorage.setItem(`${date?.toLocaleDateString()}-${num}`, value); // Save question to local storage
  };

  useEffect(() => {
    // Load responses from local storage when the component mounts
    const loadedResponses: string[] = [];
    for (let i = 0; i < questions.length; i++) {
      const response = localStorage.getItem(
        `${date?.toLocaleDateString()}-${i}`
      );
      loadedResponses.push(response || "");
    }
    setResponses(loadedResponses);
  }, [date]);

  const getWeekOfYear = (date: Date): number => {
    // Calculate the week number of the year for a given date
    const startOfYear = Date.UTC(date.getFullYear(), 0, 1);
    const diff =
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDay()) -
      startOfYear;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.ceil(diff / oneWeek) + 1;
  };

  const setupTodayPlan = (today: Date) => {
    const week = getWeekOfYear(today) + 1; // Start from week 1 (not 0)
    const wkPlan = biblePlan.find(item => item.ix.split(":")[0] === `${week}`);
    if (wkPlan) {
      const dayKey = days[today.getDay()] as DayKey;
      console.log("Today's reading plan:", wkPlan[dayKey]);
      setTodayPlan(wkPlan[dayKey]);
    } else {
      console.log("Today's reading plan: Not found");
    }
  };

  useEffect(() => {
    if (date) {
      setupTodayPlan(date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    const today = new Date();
    setDate(today);
  }, []);

  return (
    <>
      <div>
        <a href="https://GoExploreTheBible.com/adults" target="_blank">
          <img src={etbLogo} className="logo" alt="Vite logo" />
        </a>
        <a
          href="https://explorethebible.lifeway.com/category/blog/adults/"
          target="_blank"
        >
          <img src={prayingLogo} className="logo" alt="React logo" />
        </a>
      </div>

      <div className="card">
        <ThemeProvider theme={theme}>
          <Stack spacing={2} direction="column" alignItems="center">
            <Typography variant="h4" component="h1" gutterBottom>
              Praying Scripture from Psalms
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <ChooseDate
                value={date}
                onChange={newValue => setDate(newValue)}
              />
              <Link href={url2} target="_blank">
                <LinkIcon />
              </Link>
              <Link href={url3} target="_blank">
                <LinkIcon />
              </Link>
            </Stack>
            {questions.map((question, index) => (
              <Question
                key={`q-${index}`}
                label={question}
                value={responses[index] || ""}
                onChange={value =>
                  handleQuestionChange(date, index.toString(), value)
                }
              />
            ))}
          </Stack>
        </ThemeProvider>
      </div>
      <p className="read-the-docs">Click on the logos to learn more</p>
    </>
  );
}

export default App;
