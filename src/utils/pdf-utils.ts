import jsPDF from "jspdf";
import { nextTick } from "vue";

const addHeader = (doc: jsPDF) => {
    const header = "This is the header text";
    doc.setFontSize(12);
    doc.text(header, 10, 10);
};

const addFooter = (doc: jsPDF, pageNumber: number, totalPages: number) => {
    const footer = `Page ${pageNumber} of ${totalPages}`;
    doc.setFontSize(10);
    doc.text(footer, 10, doc.internal.pageSize.height - 10);
};

export const pdfService = async (element: any) => {

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    await nextTick();

    doc.html(element, {
        callback: (doc) => {
            const numPages = doc.getNumberOfPages();

            // Add header and footer to every page
            for (let i = 1; i <= numPages; i++) {
                doc.setPage(i);
                addHeader(doc);
                addFooter(doc, i, numPages);
            }

            doc.save("document.pdf");
        },
        margin: [15, 10, 15, 10],
        width: pageWidth - 30,
        html2canvas: {
            scale: 0.12,
            x: 20,
        },

    })
};
