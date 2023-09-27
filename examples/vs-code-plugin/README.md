# vscode plugins

typescript compiler kommen auch in tools die wir verwenden zum einsatz:

beispielsweise hier in der kombination eines VSCode plugins und ts2zod welches zod schemas aus typen generiert

- https://marketplace.visualstudio.com/items?itemName=psulek-solo.zodschema-generator
- verwendet [ts-to-zod](https://github.com/psulek/vscode-zodschema-generator/blob/main/src/generator.ts#L5C20-L5C26)
- [welches die typescript compiler api nutzt](https://github.com/fabien0102/ts-to-zod/blob/main/src/core/generate.ts#L87C12-L87C12)
