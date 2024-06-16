function getByIdQuery(table_name, column_name) {
    const query = `SELECT * FROM ${table_name} WHERE ${column_name} = ?`;
    return query;
}


function getQuery(table_name) {
    console.log("get query")
    let query = `SELECT * FROM ${table_name} `;
    return query;

}



// function getQuery(table_name, queryParams) {
//
//     // Extract query parameters
//     const { limit, page, fields, _start, _end } = queryParams;
//     const params = []; // Array to store query parameters
//
//     // Initialize the query with the basic SELECT statement
//     let query  = `SELECT ${fields || '*'} FROM ${table_name}`;
//     // Check for search parameters
//
//     const searchParams = {};
//     for (const key in queryParams) {
//         if (key !== 'limit' && key !== 'page' && key !== 'fields' && key !== '_start' && key !== '_end') {
//             searchParams[key] = queryParams[key];
//         }
//     }
//     if (Object.keys(searchParams).length > 0) {
//         const searchConditions = []; // Array to store search conditions
//         // Assuming searchParams is an object with key-value pairs representing field-value to search
//         for (const key in searchParams) {
//             searchConditions.push(`${key} = ?`);
//             params.push(searchParams[key]); // Add parameter value to the params array
//         }
//         // SQL injection!!!!!!!!!!!!!!!!
//         if (searchConditions.length > 0) {
//             query += `" WHERE "${searchConditions.join(' AND ')}`;
//         }
//     }
//
//     if (_start && _end) {
//         query += ` LIMIT ?, ?`;
//         params.push(_start, `${_end - _start + 1}`);
//     } else if (limit) {
//         query += ` LIMIT ?`;
//         params.push(limit);
//         if (page) {
//             const offset = (page - 1) * limit;
//             query += ` OFFSET ?`;
//             params.push(`${offset}`);
//         }
//     }
//
//     // Add additional conditions based on other query parameters as needed
//     console.log(query);
//     return { query: query, params: params };
// }


function deleteQuery(table_name, column_name) {
    const query = ` DELETE FROM ${table_name} WHERE ${column_name} = ? `;
    return query;
}

function updateQuery(table_name, column_name, columns) {
    let query = `UPDATE ${table_name} SET ${columns} WHERE ${column_name} = ?`;

    return query;
}

function createQuery(table_name, columns, values) {
    const query = `INSERT INTO ${table_name} (${columns}) VALUES (${values})`;
    return query;
}



export { getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery}