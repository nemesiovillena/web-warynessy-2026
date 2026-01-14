import config from './payload.config.ts'

console.log('Config loaded:', config ? '✓' : '✗')
console.log('Admin:', config.admin ? '✓' : '✗')
console.log('Collections:', config.collections?.length || 0)
console.log('Globals:', config.globals?.length || 0)
