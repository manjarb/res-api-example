import * as fs from 'fs';
import * as swaggerInline from 'swagger-inline';

swaggerInline(['app/src/**/*.ts'], {
    base: 'swagger.yaml',
    format: '.yaml'
}).then((generatedSwagger) => {
    fs.writeFileSync('swagger.yaml', generatedSwagger);
    console.log('Swagger File has been generated successfully');
});
