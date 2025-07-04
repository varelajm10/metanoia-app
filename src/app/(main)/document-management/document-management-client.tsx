
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FolderKanban, FileCheck, HardDrive, Share2, UploadCloud, FileText, User, Calendar } from "lucide-react";
import { AIChatBox } from "@/components/ai-chat-box";

const recentDocuments = [
    { id: 'DOC-0789', name: 'Contrato Cliente A.pdf', category: 'Contratos', status: 'Aprobado', modified: '2024-07-03' },
    { id: 'DOC-0790', name: 'Propuesta Comercial B.docx', category: 'Propuestas', status: 'En Revisión', modified: '2024-07-04' },
    { id: 'DOC-0791', name: 'Reporte Financiero Q2.xlsx', category: 'Finanzas', status: 'Borrador', modified: '2024-07-04' },
    { id: 'DOC-0792', name: 'Manual de Políticas Internas.pdf', category: 'RRHH', status: 'Publicado', modified: '2024-06-20' },
];

const statusVariant = {
    'Aprobado': 'default',
    'En Revisión': 'secondary',
    'Borrador': 'outline',
    'Publicado': 'default',
} as const;


export default function DocumentManagementClient() {
  return (
    <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Documentos Totales</CardTitle>
                    <FolderKanban className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12,450</div>
                    <p className="text-xs text-muted-foreground">+210 este mes</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pendientes de Aprobación</CardTitle>
                    <FileCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">18</div>
                    <p className="text-xs text-muted-foreground">3 con más de 48h de antigüedad</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Espacio Utilizado</CardTitle>
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">128 GB</div>
                    <p className="text-xs text-muted-foreground">64% de la cuota total</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Documentos Compartidos</CardTitle>
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">345</div>
                    <p className="text-xs text-muted-foreground">Compartidos externamente</p>
                </CardContent>
            </Card>
        </div>
        
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Carga Rápida</CardTitle>
                    <CardDescription>Arrastra y suelta tus archivos o haz clic para subirlos.</CardDescription>
                </div>
                <Button>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Subir Documento
                </Button>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Haz clic para subir</span> o arrastra y suelta</p>
                            <p className="text-xs text-muted-foreground">PDF, DOCX, XLSX, PNG, JPG (MAX. 50MB)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div> 
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Documentos Recientes</CardTitle>
                <CardDescription>Últimos documentos modificados en el sistema.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead><FileText className="h-4 w-4 inline-block mr-1"/>Nombre</TableHead>
                            <TableHead><FolderKanban className="h-4 w-4 inline-block mr-1"/>Categoría</TableHead>
                            <TableHead><FileCheck className="h-4 w-4 inline-block mr-1"/>Estado</TableHead>
                            <TableHead><Calendar className="h-4 w-4 inline-block mr-1"/>Última Modificación</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentDocuments.map(doc => (
                            <TableRow key={doc.id}>
                                <TableCell className="font-medium">{doc.name}</TableCell>
                                <TableCell><Badge variant="outline">{doc.category}</Badge></TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant[doc.status as keyof typeof statusVariant] || 'default'}>
                                        {doc.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{doc.modified}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <AIChatBox />
    </div>
  );
}
