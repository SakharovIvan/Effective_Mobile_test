
export type Task= {
status:Status
}

enum Status{
    NEW,
    INPROGRESS,
    COMPLETED,
    CANCELED,
}