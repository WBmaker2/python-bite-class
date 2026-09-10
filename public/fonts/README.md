# Report font provenance

PDF export loads the bundled `NanumGothic-Regular.ttf` only when a PDF is
requested. It is mirrored from the pinned Google Fonts repository commit
declared in `src/features/reports/pdf.ts`; the file is not loaded during app
startup.

Nanum Gothic is distributed under the SIL Open Font License 1.1. The complete
license text is kept in `OFL.txt`; the source and license are also available at
<https://github.com/google/fonts/tree/16680f8688ffcd467d2eb2146a9ce0343404581d/ofl/nanumgothic>.
