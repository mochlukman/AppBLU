import { EnvServiceProvider } from 'src/app/core/services/env.service.provider';
export const environment = {
	production: true,
	url: EnvServiceProvider.useFactory().url,
	domainServer: EnvServiceProvider.useFactory().domainServer,
	urlReport: EnvServiceProvider.useFactory().urlReport,
	socket: EnvServiceProvider.useFactory().socket,
	suffix: EnvServiceProvider.useFactory().dbSuffix,
  btb: EnvServiceProvider.useFactory().btb
};
