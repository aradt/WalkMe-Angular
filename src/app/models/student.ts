
export interface Student {
    ID: string;
    firstName: string;
    lastName: string;
    marks: string[];
}

export function emptyStudent(): Student {
    return {ID: '', firstName: '', lastName: '' , marks: [] };
}
