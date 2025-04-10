const phrases = [ 
  "maximize Productivity", "minimize Duration", "maximize Utility", "minimize Errors", "maximize Accuracy",
  "minimize Redundancy", "maximize Employees", "minimize Employees", "maximize Personalization", "minimize Expenditure",
  "maximize Closeness", "minimize Cost", "maximize Equity", "minimize Deviation", "maximize Return on Investment", "minimize Consumption",
  "maximize Resilience", "minimize Earliness", "maximize Profit", "minimize Establishments", "maximize Sales",
  "minimize Inventory", "maximize Net Present Value", "minimize Stockouts", "minimize Tardiness", "maximize Speed", "minimize Backlog", "maximize Viability", "minimize Downtime",
  "minimize Idleness", "minimize Waste", "maximize Satisfaction", "minimize Risks", "maximize Greenness", "minimize Workload",  "maximize Performance",
  "maximize Sustainability", "minimize Transportation", "maximize Happiness", "minimize Returns", "maximize Turnover",
  "minimize Vulnerability", "maximize Impressions", "minimize Tardy Jobs", "maximize Robustness", "minimize Shortage", "minimize Depreciation",
  "maximize Outputs", "minimize Dependencies", "maximize Exports", "minimize Resources", "maximize Reliability",
  "minimize Fatigue", "maximize Job Creation", "minimize Fleet Size", "maximize Social Responsibility", "minimize Inputs",
  "maximize Efficiency", "minimize Loss", "maximize Effectiveness", "minimize Imports", "maximize Quality", "minimize Cycle Time", "maximize Market Share", "minimize Makespan", "minimize Perishability", "minimize Outsourcing",
  "maximize Yield", "maximize Coverage", "minimize Maintenance Requirements", "minimize Requirements", "maximize Uptime", "minimize Overtime"];

const roller = document.getElementById('roller');
let index = 0;
let interval;

function startRolling(duration = 2000, speed = 60, pause = 2000) {
interval = setInterval(() => {
  roller.textContent = phrases[index % phrases.length];
  index++;
}, speed);

setTimeout(() => {
  clearInterval(interval);

  const finalPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  roller.textContent = finalPhrase;

  setTimeout(() => {
    startRolling(duration, speed, pause);
  }, pause);
}, duration);
}

window.onload = () => {
startRolling();
};
