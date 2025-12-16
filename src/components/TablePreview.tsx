import React, { useMemo } from 'react';
import { PreviewProps } from 'sanity';
import { Card, Text, Stack } from '@sanity/ui';
import { STL, getRenderer } from 'structured-table';
import { ReactRenderer } from './type';

interface TablePreviewProps extends PreviewProps {
    title?: string;
    subtitle?: string; // This will contain the stlString
}



export function TablePreview(props: TablePreviewProps) {
    const { title, subtitle: stlString } = props;

    const tableData = useMemo(() => {
        if (!stlString) return null;
        try {
            return STL.parse(stlString);
        } catch (e) {
            return null;
        }
    }, [stlString]);

    const hasContent = useMemo(() => {
        if (!tableData) return false;
        const hasHeader = (tableData.header?.cells?.length ?? 0) > 0;
        const hasBody = tableData.body?.length > 0;
        const hasFooter = (tableData.footer?.cells?.length ?? 0) > 0;
        return hasHeader || hasBody || hasFooter;
    }, [tableData]);

    const { Table } = getRenderer<ReactRenderer>("react");

    return (
        <Card>
            <Stack space={3}>
                {hasContent && tableData ? (
                    <Table className="border" data={tableData} />
                ) : (
                    <Text size={1} muted>
                        Empty Table
                    </Text>
                )}
            </Stack>
        </Card>
    );
}
