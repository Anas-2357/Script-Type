export function addCursor(index, arr) {
    arr.splice(index, 0, { char: "", status: "blink" });
}

export function removeCursor(index, arr) {
    arr.splice(index, 1);
}
