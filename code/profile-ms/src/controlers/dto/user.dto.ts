export interface UserDto {
    id: string;
    username?: string;
}

export function validate(jsonInput:UserDto) {
    if (!jsonInput.id || typeof jsonInput.id !== "string" || jsonInput.id.length < 8) throw new Error("Invalid id");
    if (jsonInput.username && typeof jsonInput.username !== "string") throw new Error("Invalid username");
}

