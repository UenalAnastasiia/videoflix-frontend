import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChunkPipe } from 'src/pipes/chunk-pipe';


@Component({
  selector: 'app-alphabet-table',
  standalone: true,
  imports: [CommonModule, ChunkPipe, MatButtonModule, MatIconModule],
  templateUrl: './alphabet-table.component.html',
  styleUrl: './alphabet-table.component.scss'
})
export class AlphabetTableComponent {
  alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p","q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ä", "ö", "ü", "_", "-", ".", ",", "`", ":"];

}
