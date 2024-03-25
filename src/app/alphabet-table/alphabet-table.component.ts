import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChunkPipe } from 'src/pipes/chunk-pipe';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-alphabet-table',
  standalone: true,
  imports: [CommonModule, ChunkPipe, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './alphabet-table.component.html',
  styleUrl: './alphabet-table.component.scss'
})
export class AlphabetTableComponent {
  alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p","q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ä", "ö", "ü", "ß"];
  symbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", ".", ",", "?", "!", ":", "/","%", "&", "@", "(", ")", "=", "+", "*"];
  @Output() updateValue = new EventEmitter<string>();
  input = [];
  showAlphabet: boolean = true;


  showNumberKeyboard() {
    this.showAlphabet = false;
  }


  showAlphabetKeyboard() {
    this.showAlphabet = true;
  }


  getSearchValue(value: string) {
    this.input.push(value);
    this.emitValue(this.input);
  }


  addSpaceToValue() {
    this.input.push(' ');
    this.emitValue(this.input);
  }


  removeElementFromValue() {
    this.input.pop();
    this.emitValue(this.input);
  }


  deleteValue() {
    this.input = [];
    this.emitValue(this.input);
  }


  emitValue(res: string[]) {
    const valueString = res.toString()
    let stringResult = valueString.split(',').join('')    
    this.updateValue.emit(stringResult);
  }
}