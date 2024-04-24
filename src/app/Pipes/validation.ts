import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function fieldValidator(): ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {

        const value:string = control.value;

        if (!value) { return null; }

        const allowedNames:string[] = ['Laya','K-Naina','Verdejo','Monastrell']

        return !allowedNames.includes(value) ? {nameInList:true} : null;
    }
}