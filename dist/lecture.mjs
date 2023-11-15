export class Lecture {
    constructor(science, timing, auditory, lecturer, type, group, day, maxStudents) {
        this.science = science;
        this.timing = timing;
        this.auditory = auditory;
        this.lecturer = lecturer;
        this.type = type;
        this.group = group;
        this.day = day;
        this.maxStudents = maxStudents;
    }
    auditoryMismatch() {
        return this.maxStudents > this.auditory.capacity ? 1 : 0;
    }
    conflicts(p) {
        if (!(p.day === this.day && p.timing === this.timing)) {
            return 0;
        }
        let conflicts = 0;
        // auditory conflict
        if (this.auditory === p.auditory &&
            (p.group !== this.group ||
                p.lecturer !== this.lecturer ||
                p.science !== this.science ||
                p.type !== this.type)) {
            conflicts += 1;
        }
        // group conflict
        if (this.group === p.group &&
            (this.auditory !== p.auditory ||
                p.lecturer !== this.lecturer ||
                p.science !== this.science ||
                p.type !== this.type)) {
            conflicts += 1;
        }
        // lecturer conflict
        if (this.lecturer === p.lecturer &&
            (this.auditory !== p.auditory ||
                p.group !== this.group ||
                p.science !== this.science ||
                p.type !== this.type)) {
            conflicts += 1;
        }
        return conflicts;
    }
}
