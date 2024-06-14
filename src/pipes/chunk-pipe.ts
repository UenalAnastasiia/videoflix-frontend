import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'chunk',
    standalone: true
})

export class ChunkPipe implements PipeTransform {

    transform(symbols: any, chunkSize: number): any {
        let symbolsList = [];
        let sym = [];

        symbols.map((day, index) => {
            sym.push(day);
            if (++index % chunkSize === 0) {
                symbolsList.push(sym);
                sym = [];
            }
        });
        return symbolsList;
    }
}