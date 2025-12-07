import { useSignUpMutation } from '@/api/onwerAuthApi';
import { AuthLayout } from '@/components/shared/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setCredentials } from '@/store/userSlice';
import { validateEmail, validateName, validatePassword } from '@/utils/validation';
import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signUp, { isLoading }] = useSignUpMutation();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });

  const validate = () => {
    const nameError = validateName(form.name);
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    setErrors({
      name: nameError || '',
      email: emailError || '',
      password: passwordError || ''
    });
    return !nameError && !emailError && !passwordError;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const result = await signUp(form).unwrap();
      // TODO: auth response is to be corrected
      dispatch(setCredentials({ user: result.user, token: result.token }));
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: unknown) {
      toast.error('Failed to create account');
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Get started with DigiLedger">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          id="name" label="Full Name" type="text" placeholder="John Doe"
          value={form.name} error={errors.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
        <Button type="submit" isLoading={isLoading}>Create Account</Button>
      </form>
      <p className="mt-6 text-center text-slate-600">
        Already have an account?{' '}
        <Link to="/signin" className="text-primary font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

