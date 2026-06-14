export function formatDate(dateString) {
    const date = new Date(dateString);

    const formatted = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric"
    });

    return formatted;
}