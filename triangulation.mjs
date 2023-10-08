export function calculateConeMesh(height, radius, segments) {
    const positions = [];
    const indices = [];

    // Вершины основания конуса
    positions.push(0, 0, 0); // Центр основания
    for (let i = 0; i < segments; i++) {
        const theta = (2 * Math.PI * (i / segments));
        const x = radius * Math.cos(theta);
        const z = radius * Math.sin(theta);
        positions.push(x, 0, z); // Вершина на окружности основания
    }

    // Вершины вершины конуса
    positions.push(0, height, 0); // Вершина

    // Индексы треугольников основания конуса
    for (let i = 1; i <= segments; i++) {
        indices.push(i, 0, ((i % segments) + 1));
    }

    // Индексы треугольников боковой поверхности конуса
    for (let i = 1; i <= segments; i++) {
        indices.push(i, ((i % segments) + 1), positions.length / 3 - 1);
    }

    return { positions, indices };
}