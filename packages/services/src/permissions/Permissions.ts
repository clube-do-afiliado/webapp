export default [
    'user:*',
    'user:self:*',
    'store:*',
    'store:self:*',
    'store:self:multiple:*',
    'store:self:multiple:2',
    'store:self:multiple:5',
    'plans:*',
    'shopee:*',
    'magalu:*',
    'mercado-livre:*',
    'amazon:*',
    'other:*'
] as const satisfies string[];