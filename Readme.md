decodificar-uri-componente
CI Estado de cobertura

Un mejor decodeURIComponent

¿Por qué?
Decodifica +a un espacio.
Convierte la lista de materiales en un carácter de reemplazo � .
No arroja con entrada codificada no válida.
Decodifica tanto de la cadena como sea posible.
Instalar
$ npm install --save decode-uri-component
Uso
const decodeUriComponent = require('decode-uri-component');

decodeUriComponent('%25');
//=> '%'

decodeUriComponent('%');
//=> '%'

decodeUriComponent('st%C3%A5le');
//=> 'ståle'

decodeUriComponent('%st%C3%A5le%');
//=> '%ståle%'
 
decodeUriComponent('%%7Bst%C3%A5le%7D%');
//=> '%{ståle}%'

decodeUriComponent('%7B%ab%%7C%de%%7D');
//=> '{%ab%|%de%}'

decodeUriComponent('%FE%FF');
//=> '\uFFFD\uFFFD'

decodeUriComponent('%C2');
//=> '\uFFFD'

decodeUriComponent('%C2%B5');
//=> 'µ'
API
decodeUriComponent(encodedURI)
codificadoURI
Escribe:string

Un componente codificado de un Identificador Uniforme de Recursos.

Licencia
MIT © Sam Verschueren
