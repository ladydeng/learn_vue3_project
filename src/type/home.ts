type ListItem = {
    name: string,
    age: number,
    intro?: () => void
}

export interface List {
    [index: number]: ListItem
}