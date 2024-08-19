export function toOption<T extends {name: string}>(elementWithName: T | undefined){
    return elementWithName && {value: elementWithName, label: elementWithName.name};
}

export function toOptions<T extends {name: string}>(elementsWithNames : readonly T[]){
    return elementsWithNames.map(element => ({value: element, label: element.name}));
}

export function toOptionRaw(stringElement: string | undefined){
    return stringElement && {value: stringElement, label: stringElement};
}

export function toOptionsRaw(stringElements : readonly string[]){
    return stringElements.map(element => ({value: element, label: element}));
}