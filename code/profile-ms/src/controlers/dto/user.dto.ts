export type UserDto = {
    id: string;
    username?: string;
    country?: string;
}

export type ParamsDto = {
    username: string,
    country: string,
    page: string,
    limit: string,
    orderBy: string,
    order: string,
}

export type SearchParamsDto = {
    username: string,
    country: string
}

export type QueryDto = {
    page: string,
    limit: string,
    orderBy: string,
    order: string,
}

export function validateUser(jsonInput:UserDto) {
    if (!jsonInput.id || typeof jsonInput.id !== "string" || jsonInput.id.length < 8) throw new Error("Invalid id");
    if (jsonInput.username && typeof jsonInput.username !== "string") throw new Error("Invalid username");
    if (jsonInput.country && typeof jsonInput.country !== "string") throw new Error("Invalid country");
}

// pensando en que claramente los datos van a crecer, solo quiero una validacion exclusiva para el id 
export function validateId(inputId: string) {
    if (!inputId || typeof inputId !== "string" || inputId.length < 8) throw new Error("Invalid id");
}

export function validateParamsQuery(params: ParamsDto) {
    const pageChecker: number = Number(params.page);
    const limitChecker: number = Number(params.limit);
    // const orderChecker: string[] = ["asc", "desc"]

    if (!pageChecker || typeof pageChecker !== "number" || pageChecker < 0) throw new Error("Invalid page number");
    if (!limitChecker || typeof limitChecker !== "number" || limitChecker < 0) throw new Error("Invalid limit number");

    if (params.username && typeof params.username !== "string") throw new Error("Invalid username");
    if (params.country && typeof params.country !== "string") throw new Error("Invalid country");
    if (params.order && typeof params.order !== "string" && params.order in params) throw new Error("Invalid search parameter");
    // if (!(params.orderBy in orderChecker)) throw new Error("Invalid order parameter");
}
