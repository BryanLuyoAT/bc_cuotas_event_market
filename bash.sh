#!/bin/bash

declare -a textos_a_comparar=( "close connectWebSocket" "error connectWebSocket" "catch connectWebSocket" )

# Variables de conexión a la base de datos
DB_HOST=""
DB_USER=""
DB_PASS=""
DB_NAME=""

# Consulta SQL
SQL_QUERY="SELECT event FROM logs_ws_events ORDER BY id DESC LIMIT 1"

# Ejecutar la consulta y capturar la salida en una variable
result=$(mysql -h $DB_HOST -u $DB_USER -p$DB_PASS $DB_NAME -e "$SQL_QUERY")



# Verificar si la consulta devolvió resultados
if [ -n "$result" ] 
then
    echo "$result"
    # Comparar cada texto del array con el resultado de la consulta

    encontrado=false
    for texto in "${textos_a_comparar[@]}"; do
        if [[ "$result" == "$texto" ]]; then
            encontrado=true
            break
        fi
    done

    # Verificar si se encontró una coincidencia
    if [ "$encontrado" == true ]; then
        echo "Se encontró una coincidencia con uno de los textos."
    else
        echo "No se encontró ninguna coincidencia con los textos."
        exec npm run start
    fi
else
    echo "La consulta no devolvió resultados."
fi