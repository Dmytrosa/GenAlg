import { makeInitialPopulation } from "./initialPopulation.mjs";
import { TimeTable } from "./timetable.mjs";
export class Scheduler {
    constructor(populationSize, mutationChance, terminationF, populationGenerator, offspring) {
        this.populationSize = populationSize;
        this.mutationChance = mutationChance;
        this.terminationF = terminationF;
        this.populationGenerator = populationGenerator;
        this.offspring = offspring;
    }
    composeSchedule() {
        let basePopulation = this.populationGenerator(this.populationSize);
        let step = 0;
        let terminationMatch = [];
        let i = 0;
        while (i < 10e5) {
            terminationMatch = basePopulation.filter((e) => this.terminationF(e.calculateFitness()));
            if (terminationMatch.length > 0) {
                break;
            }
            const selection = this.performSelection(basePopulation);
            const offspring = [...Array(this.offspring).fill(0)].map((_) => this.mutate(this.crossover(selection)));
            if (step % 10000 === 0) {
                console.log(`generation step:${step}`);
                console.log(selection[0].calculateFitness());
            }
            basePopulation = [...selection, ...offspring];
            step += 1;
        }
        console.log("steps: ", step);
        return terminationMatch.at(0) || null;
    }
    performSelection(timeTables) {
        return this.makeSortedPopulation(timeTables).slice(0, timeTables.length - this.offspring);
    }
    makeSortedPopulation(timeTables) {
        return timeTables.sort((a, b) => b.calculateFitness() - a.calculateFitness());
    }
    crossover(parents) {
        const crossoverPoint = Math.floor(Math.random() * parents[0].schedule.length);
        const offspring = new TimeTable([...parents[0].schedule]);
        [...new Array(crossoverPoint)].forEach((_, i) => {
            if (Math.random() > 0.5) {
                offspring.schedule[i] = parents[1].schedule[i];
            }
            else {
                offspring.schedule[i] = parents[0].schedule[i];
            }
        });
        return offspring;
    }
    mutate(t) {
        const scheduleMutatedFully = makeInitialPopulation(1)[0].schedule;
        const halfMutatedSchedule = t.schedule.map((e, i) => {
            return Math.random() > this.mutationChance ? e : scheduleMutatedFully[i];
        });
        return new TimeTable(halfMutatedSchedule);
    }
}
