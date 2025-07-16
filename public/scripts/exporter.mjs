// SPDX-FileCopyrightText: 2025 Menno van der Graaf <mennovandergraaf@hotmail.com>
// SPDX-License-Identifier: MIT

import {
    Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell
} from 'https://cdn.jsdelivr.net/npm/docx@9.5.1/+esm'
import fileSaver from 'https://cdn.jsdelivr.net/npm/file-saver@2.0.5/+esm'

export function exportDocx() {
    const doc = new Document({
        sections: [{
            properties: {}, children: [new Paragraph({
                children: [new TextRun("Hello World\n"), new TextRun({
                    text: "Foo Bar", bold: true
                }), new TextRun({
                    text: "\tGithub is the best", bold: true
                })]
            }), new Table({
                rows: [new TableRow({
                    children: [new TableCell({
                        children: [new Paragraph("hello")],
                    }),],
                }),],
            })]
        }], creator: "Menno van der Graaf", description: "Blokkies Export", title: "Blokkies"
    });

    Packer.toBlob(doc).then((blob) => {
        const now = new Date();
        const timestamp = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
            fileSaver.saveAs(blob, `blokkies ${timestamp}.docx`);
    });
}
