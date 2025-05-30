import copy from 'copy-to-clipboard';

import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Input from '@cda/ui/components/Input';
import { useAlert } from '@cda/ui/components/Alert';
import Typography from '@cda/ui/components/Typography';
import ButtonIcon from '@cda/ui/components/ButtonIcon';
import { Modal, HelperModalProps } from '@cda/ui/components/Modal';

import { SOURCE_MAP } from '@cda/services/events';

export default function SharedModal({ url, isOpen, onToggleModal }: HelperModalProps<{ url: string; }>) {
    const { addAlert } = useAlert();

    const copyUrl = (source: EventSource) => {
        addAlert({
            message: 'Url copiada',
            color: 'success',
            icon: <Icon name="check" />
        });
        onToggleModal();
        copy(`${url}?utm_source=${source}`);
    };

    return (
        <Modal
            isOpen={isOpen}
            title={
                <Typography variant="h6" noMargin>
                    Onde você quer compartilhar este produto?
                </Typography>
            }
            subtitle={
                <Typography noMargin color="text.secondary">
                    Vamos encurtar sua URL para deixá-la mais atrativa
                </Typography>
            }
            onClose={onToggleModal}
        >
            <Stack spacing="small">
                {
                    Object.entries(SOURCE_MAP).map(([key, value]) => (
                        <Input
                            key={key}
                            fullWidth
                            readOnly
                            type="text"
                            startIcon={<Icon name={key} style={{ color: value.color }} />}
                            endIcon={
                                <ButtonIcon onClick={() => copyUrl(key as unknown as EventSource)}>
                                    <Icon name="copy" />
                                </ButtonIcon>
                            }
                            value={value.label}
                        />
                    ))
                }
            </Stack>
        </Modal>
    );
}
