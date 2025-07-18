
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FolderKanban, FileCheck, HardDrive, Share2, UploadCloud, FileText, User, Calendar } from "lucide-react";
import { AIChatBox } from "@/components/ai-chat-box";
import { useTranslations } from "next-intl";

const recentDocuments = [
    { id: 'DOC-0789', name: 'Contrato Cliente A.pdf', category: 'Contratos', status: 'Approved', modified: '2024-07-03' },
    { id: 'DOC-0790', name: 'Propuesta Comercial B.docx', category: 'Propuestas', status: 'In Review', modified: '2024-07-04' },
    { id: 'DOC-0791', name: 'Reporte Financiero Q2.xlsx', category: 'Finanzas', status: 'Draft', modified: '2024-07-04' },
    { id: 'DOC-0792', name: 'Manual de Políticas Internas.pdf', category: 'RRHH', status: 'Published', modified: '2024-06-20' },
];

export default function DocumentManagementClient() {
  const t = useTranslations("DocumentManagement");

  const statusVariant = {
      'Approved': 'default',
      'In Review': 'secondary',
      'Draft': 'outline',
      'Published': 'default',
  } as const;

  const getStatusTranslation = (status: keyof typeof statusVariant) => {
    const key = `status${status.replace(' ', '')}` as 'statusApproved' | 'statusInReview' | 'statusDraft' | 'statusPublished';
    return t(key);
  }

  return (
    <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('totalDocuments')}</CardTitle>
                    <FolderKanban className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12,450</div>
                    <p className="text-xs text-muted-foreground">+210 {t('thisMonth')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('pendingApproval')}</CardTitle>
                    <FileCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">18</div>
                    <p className="text-xs text-muted-foreground">{t('olderThan48h')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('spaceUsed')}</CardTitle>
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">128 GB</div>
                    <p className="text-xs text-muted-foreground">64% {t('ofTotalQuota')}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('sharedDocuments')}</CardTitle>
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">345</div>
                    <p className="text-xs text-muted-foreground">{t('sharedExternally')}</p>
                </CardContent>
            </Card>
        </div>
        
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>{t('quickUpload')}</CardTitle>
                    <CardDescription>{t('quickUploadSubtitle')}</CardDescription>
                </div>
                <Button>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    {t('uploadDocument')}
                </Button>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">{t('dropzoneLabel')}</span></p>
                            <p className="text-xs text-muted-foreground">{t('dropzoneHint')}</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div> 
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>{t('recentDocuments')}</CardTitle>
                <CardDescription>{t('recentDocumentsSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead><FileText className="h-4 w-4 inline-block mr-1"/>{t('tableName')}</TableHead>
                            <TableHead><FolderKanban className="h-4 w-4 inline-block mr-1"/>{t('tableCategory')}</TableHead>
                            <TableHead><FileCheck className="h-4 w-4 inline-block mr-1"/>{t('tableStatus')}</TableHead>
                            <TableHead><Calendar className="h-4 w-4 inline-block mr-1"/>{t('tableLastModified')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentDocuments.map(doc => (
                            <TableRow key={doc.id} className="hover:bg-muted">
                                <TableCell className="font-medium">{doc.name}</TableCell>
                                <TableCell><Badge variant="outline">{doc.category}</Badge></TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant[doc.status as keyof typeof statusVariant] || 'default'}>
                                        {getStatusTranslation(doc.status as keyof typeof statusVariant)}
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
