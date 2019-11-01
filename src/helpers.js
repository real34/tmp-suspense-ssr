import React from "react";

export const delay = durationInMs => value =>
  new Promise(resolve => setTimeout(() => resolve(value), durationInMs));

export const Loading = () => <section className="loading">Loading…</section>;
