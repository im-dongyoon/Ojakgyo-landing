"use client";

import { useEffect } from "react";

import { recordVisit } from "./actions";
import { readAttribution } from "./client";

// 개발 모드에서 effect가 두 번 도는 것을 막는다
let recorded = false;

/** 페이지를 열 때 방문을 한 번 기록한다. 화면에는 아무것도 그리지 않는다. */
export function VisitTracker() {
  useEffect(() => {
    if (recorded) return;
    recorded = true;
    const { search, referrer } = readAttribution();
    void recordVisit(search, referrer);
  }, []);

  return null;
}
