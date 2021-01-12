export interface Order {
    approveDate: string|null
    phone_number: string
    id: number
    state: string
}

export interface OrderDetailed extends Order {
    products: Array<number>
}