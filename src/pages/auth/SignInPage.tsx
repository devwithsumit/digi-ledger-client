import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AuthLayout } from '@/components/shared/AuthLayout';
import { useSignInMutation } from '@/api/onwerAuthApi';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setCredentials } from '@/store/userSlice';
import { validateEmail, validatePassword } from '@/utils/validation';

export function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signIn, { isLoading }] = useSignInMutation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validate = () => {
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    setErrors({ email: emailError || '', password: passwordError || '' });
    return !emailError && !passwordError;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {

      const result = await signIn(form).unwrap();
      // the auth response is different from this one
      dispatch(setCredentials({ user: result.user, token: result.token }));
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error('Invalid email or password');
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          id="email" label="Email" type="email" placeholder="you@example.com"
          value={form.email} error={errors.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          id="password" label="Password" type="password" placeholder="••••••••"
          value={form.password} error={errors.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button type="submit" isLoading={isLoading}>Sign In</Button>
      </form>
      <p className="mt-6 text-center text-slate-600">
        Don't have an account?{' '}
        <Link to="/signup" className="text-primary font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}

