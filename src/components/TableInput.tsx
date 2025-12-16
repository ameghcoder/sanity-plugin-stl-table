import React, { useCallback, useMemo } from 'react';
import { PatchEvent, set, unset } from 'sanity';
import { FormField } from 'sanity';
import { Card, Text, TextArea, Stack } from '@sanity/ui';
import { STL, getRenderer, SanityTable } from 'structured-table';
import { ReactRenderer, TableInputProps } from './type';

const TableInput = React.forwardRef<HTMLTextAreaElement, TableInputProps>((props, ref) => {
    const { schemaType, value, onChange, onFocus, onBlur, readOnly } = props;

    // 1. Convert the STL string (value) to JSON (SanityTable) for the preview
    const tableData: SanityTable | null = useMemo(() => {
        try {
            if (!value) return null;
            return STL.parse(value);
        } catch (error) {
            console.error("STL Parsing Error:", error);
            return null;
        }
    }, [value]);

    // 2. Handle changes from the textarea
    const handleTextChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const nextValue = event.currentTarget.value;

        // Using PatchEvent to update the Sanity document
        if (nextValue) {
            onChange(PatchEvent.from(set(nextValue)));
        } else {
            onChange(PatchEvent.from(unset())); // Remove the field if empty
        }
    }, [onChange]);

    const hasContent = useMemo(() => {
        if (!tableData) return false;
        const hasHeader = (tableData.header?.cells?.length ?? 0) > 0;
        const hasBody = tableData.body?.length > 0;
        const hasFooter = (tableData.footer?.cells?.length ?? 0) > 0;
        return hasHeader || hasBody || hasFooter;
    }, [tableData]);

    const { Table } = getRenderer<ReactRenderer>("react");

    return (
        <Stack space={3}>
            <FormField
                // description={schemaType?.description}
                // title={schemaType?.title}
                __unstable_presence={props['__unstable_presence' as keyof TableInputProps]} // Handle internal props safely
                inputId={props['inputId' as keyof TableInputProps] || ''}
            >
                <Stack space={4}>
                    {/* === A. Input Area for STL Text === */}
                    <Card padding={0} border>
                        <TextArea
                            ref={ref}
                            value={value || ''}
                            onChange={handleTextChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            readOnly={readOnly}
                            rows={10}
                            placeholder="[header]... | ... [body]... | ..."
                            style={{ fontFamily: 'monospace', fontSize: '0.9em' }}
                        />
                    </Card>

                    {/* === B. Live Preview Area === */}
                    <Card padding={3} border tone="transparent" radius={2}>
                        <Stack space={3}>
                            <Text size={1} weight="bold" muted>Live Preview</Text>
                            {hasContent && tableData ? (
                                // 3. Render the preview using your custom React component
                                <Table className="border" data={tableData} />
                            ) : (
                                <Text size={1} muted>
                                    Start by defining a section (e.g. <code>[header]</code> or <code>[body]</code>) to see the preview.
                                </Text>
                            )}
                        </Stack>
                    </Card>
                </Stack>
            </FormField>
        </Stack>
    );
});

export default TableInput;