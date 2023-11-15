var _a;
import { makeInitialPopulation } from "./initialPopulation.mjs";
import "./scheduler.mjs";
import { Scheduler } from "./scheduler.mjs";
const POPULATION_SIZE = 15;
const MUTATION_RATE = 0.001;
const scheduler = new Scheduler(POPULATION_SIZE, MUTATION_RATE, (f) => f > 0.5, makeInitialPopulation, 6);
(_a = scheduler.composeSchedule()) === null || _a === void 0 ? void 0 : _a.print();
