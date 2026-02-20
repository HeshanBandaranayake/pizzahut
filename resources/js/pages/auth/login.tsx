import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';


type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};


export default function Login({ status, canResetPassword, canRegister }: Props) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] via-[#f53003] to-[#fff] p-4">
            <Head title="PizzaHut Software Login" />
            <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white/95 dark:bg-[#1a1a1a]/95 p-8 flex flex-col items-center relative">
                {/* Pizza Hut Logo Placeholder */}
                <div className="mb-6 flex flex-col items-center">
                    <div className="mb-2">
                        {/* Replace with actual Pizza Hut SVG or image if available */}
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                            <ellipse cx="32" cy="32" rx="30" ry="16" fill="#f53003" />
                            <ellipse cx="32" cy="32" rx="24" ry="12" fill="#fff" />
                            <ellipse cx="32" cy="32" rx="20" ry="8" fill="#1a1a1a" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-extrabold text-[#f53003] tracking-wide mb-1">PizzaHut Software</h1>
                    <p className="text-base text-[#1a1a1a] dark:text-white font-medium">Sign in to your account</p>
                </div>
                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="flex flex-col gap-6 w-full"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-4">
                                <div className="grid gap-1">
                                    <Label htmlFor="email" className="text-[#f53003] font-semibold">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="email@example.com"
                                        className="rounded-full border-2 border-[#f53003] focus:border-[#1a1a1a] px-4 py-2 bg-white/90 dark:bg-[#232323] text-[#1a1a1a] dark:text-white"
                                    />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="grid gap-1">
                                    <div className="flex items-center">
                                        <Label htmlFor="password" className="text-[#f53003] font-semibold">Password</Label>
                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="ml-auto text-xs text-[#f53003] hover:underline"
                                                tabIndex={5}
                                            >
                                                Forgot password?
                                            </TextLink>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="Password"
                                        className="rounded-full border-2 border-[#f53003] focus:border-[#1a1a1a] px-4 py-2 bg-white/90 dark:bg-[#232323] text-[#1a1a1a] dark:text-white"
                                    />
                                    <InputError message={errors.password} />
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                    />
                                    <Label htmlFor="remember" className="text-[#1a1a1a] dark:text-white">Remember me</Label>
                                </div>
                                <Button
                                    type="submit"
                                    className="mt-2 w-full rounded-full bg-[#f53003] hover:bg-[#c41e00] text-white font-bold py-2 px-4 text-lg shadow-md transition-colors duration-200"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing && <Spinner />}
                                    Log in
                                </Button>
                            </div>
                            {canRegister && (
                                <div className="text-center text-sm mt-4 text-[#1a1a1a] dark:text-white">
                                    Don't have an account?{' '}
                                    <TextLink href={register()} tabIndex={5} className="text-[#f53003] font-semibold hover:underline">
                                        Sign up
                                    </TextLink>
                                </div>
                            )}
                        </>
                    )}
                </Form>
                {status && (
                    <div className="mt-4 text-center text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
}
