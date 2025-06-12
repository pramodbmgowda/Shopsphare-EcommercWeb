import { Directive, EventEmitter, HostBinding, HostListener, Output, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from './_model/file-handle.model';

@Directive({
  selector: '[appDrag]',
  standalone: true
})
export class DragDirective {
  @Output() filesDropped: EventEmitter<FileHandle[]> = new EventEmitter<FileHandle[]>();
  @HostBinding("style.background") private background = "#eee";
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  @HostListener("dragover", ["$event"])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = "#ccc";
  }

  @HostListener("dragleave", ["$event"])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = "#eee";
  }

  @HostListener("drop", ["$event"])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = "#eee";

    const files: FileHandle [] = []  ;

    if (event.dataTransfer?.files.length) {
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        const file = event.dataTransfer.files[i];

        if (file instanceof File) {
          const url = this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(file)
          );

          files.push({ file, url });
        }
      }
    }

    if (files.length > 0) {
      this.filesDropped.emit(files);
    }
  }
}