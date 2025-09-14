import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Broker simples para chamadas à API
 */
export class Broker {
    public static readonly SERVER_HOST: string = 'http://localhost:8081'; // URL base da API
    public static readonly BROKER_PATH: string = '/api';

    /**
     * Cria um proxy para um serviço específico
     * @param serviceName Nome do serviço na API
     */
    public static service(serviceName: string): ServiceProxy {
        return new ServiceProxy(serviceName);
    }
}

/**
 * Proxy que representa um serviço específico
 */
class ServiceProxy {
    private static readonly httpClient = new HttpClient(
        new HttpXhrBackend({
            build: () => new XMLHttpRequest(),
        })
    );

    constructor(private readonly serviceName: string) { }

    /**
     * Chama um método da API
     * @param methodName Nome do método do serviço
     * @param args Argumentos que serão enviados
     * @param useGet Se true, faz GET; caso contrário, POST
     */
    public method<Entity>(methodName: string, args: any[] = [], useGet: boolean = false): Observable<Entity> {
        let URL = `${Broker.SERVER_HOST}${Broker.BROKER_PATH}/${this.serviceName}/${methodName}`;

        if (useGet) {
            // Converte args em query string: assume args[0] como objeto de parâmetros
            if (args[0] && typeof args[0] === 'object') {
                const query = Object.keys(args[0])
                    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(args[0][k]))
                    .join('&');
                URL += '?' + query;
            }
            return ServiceProxy.httpClient.get<Entity>(URL);
        } else {
            // POST: converte todos os argumentos em JSON
            const data = args.map(arg => JSON.stringify(arg));
            return ServiceProxy.httpClient.post<Entity>(URL, data);
        }
    }
}
