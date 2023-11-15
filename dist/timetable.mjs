export class TimeTable {
    constructor(schedule) {
        this.schedule = schedule;
    }
    calculateFitness() {
        let conflicts = 0;
        this.schedule.forEach((lesson) => {
            conflicts += lesson.auditoryMismatch();
            conflicts += this.schedule.reduce((acc, pretender) => acc + lesson.conflicts(pretender), 0);
        });
        return 1 / (conflicts + 1);
    }
    print() {
        console.table(this.schedule.map((e) => {
            return {
                auditory: e.auditory.name,
                science: e.science,
                timing: e.timing.time,
                lecturer: e.lecturer.name,
                type: e.type,
                group: e.group,
                day: e.day.name,
            };
        }));
    }
}
