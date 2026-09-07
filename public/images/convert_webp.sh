#!/bin/bash

# Qualidade do WebP (0 a 100)
QUALITY=80

echo "Iniciando a conversão para WebP..."

# Converte arquivos .jpg e .jpeg
for img in *.[jJ][pP][gG] *.[jJ][pP][eE][gG]; do
    # Verifica se o arquivo realmente existe
    [ -f "$img" ] || continue
    filename="${img%.*}"
    cwebp -q $QUALITY "$img" -o "${filename}.webp"
    echo "Convertido: $img -> ${filename}.webp"
done

# Converte arquivos .png
for img in *.[pP][nN][gG]; do
    [ -f "$img" ] || continue
    filename="${img%.*}"
    cwebp -q $QUALITY "$img" -o "${filename}.webp"
    echo "Convertido: $img -> ${filename}.webp"
done

echo "Conversão concluída!"
