import type { Permissions } from './interface';

type PermissionMapped = Partial<{
    [x in Permissions]: string;
}>;

export const MAP_PERMISSION: PermissionMapped = {
    'bio:*': 'Crie e edite uma bio personalizada para sua página',
    'templates:*': 'Modelos prontos para destacar seus produtos nas redes e nas vendas!',
    'store:self:*': 'Personalize sua loja do seu jeito',
    'user:self:*': 'Gerencie seu perfil com segurança e autonomia',
    'product:self:*': 'Gerencie os seus próprios produtos com facilidade',
};
