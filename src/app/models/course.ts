
export interface Course {
    ID: string;
    name: string;
    students: string[];
}

export function emptyCourse() {
    return {ID: '', name: '', students: []};
}
