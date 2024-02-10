export interface Unit {
    id: number,
    name: string,
    status: number,
    imgUrl: string,
    description: string
}

export interface User {
    id: number,
    username: string,
    fio: string,
    isModerator: boolean,
    imageUrl: string
}

export interface Order {
    id: number,
    status: number,
    creator: User,
    moderator: User,
    creationDate: string,
    formationDate: string,
    endDate: string,
    name: string,
    description: string
}


export interface Option {
    id: number,
    name: string
}