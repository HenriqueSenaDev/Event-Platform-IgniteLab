import { Logo } from '../components/Logo';
import reactIcon from '../assets/reactjs-icon.svg';
import { FormEvent, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_SUBSCRIBER_MUTATION = gql`
    mutation CreateSubscriber ($name: String!, $email: String!) {
        createSubscriber(data: {name: $name email: $email}) {
            id
        }
    }
`

export const Subscribe = () => {
    const navigate = useNavigate();

    const [name, setName] = useState<String>("");
    const [email, setEmail] = useState<String>("");

    const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION);

    async function handleSubscribe(event: FormEvent) {
        event.preventDefault();
        await createSubscriber({
            variables: {
                name,
                email
            }
        });
        navigate('/event');
    }

    return (
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
            <img
                className="absolute top-[10px] max-w-[620px] max-h-[620px]"
                src={reactIcon}
                alt=""
            />

            <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto z-[1]">
                <div className="max-w-[640px] flex flex-col">
                    <Logo />
                    <h1 className="text-[2.5rem] leading-tight">
                        Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
                    </h1>
                    <p className="mt-4 text-gray-200  leading-relaxed">
                        Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
                    </p>
                </div>

                <div className="p-8 bg-gray-700 border border-gray-500 rounded">
                    <strong className="text-2xl mb-6 block">
                        Inscreva-se gratuitamente
                    </strong>

                    <form action="" onSubmit={handleSubscribe} className="flex flex-col w-full gap-2">
                        <input
                            className="bg-gray-900 rounded px-5 h-14"
                            type="text"
                            placeholder="Seu nome completo"
                            onChange={event => setName(event.target.value)}
                        />
                        <input
                            className="bg-gray-900 rounded px-5 h-14"
                            type="email"
                            placeholder="Digite seu e-mail"
                            onChange={event => setEmail(event.target.value)}
                        />

                        <button
                            type="submit"
                            className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                            disabled={loading}
                        >
                            Garantir minha vaga
                        </button>
                    </form>
                </div>
            </div>

            <img src="/src/assets/cold-mockup.png" className="mt-10" alt="" />
        </div>
    );
}

export default Subscribe;