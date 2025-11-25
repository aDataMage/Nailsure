"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const initialState = {
    error: "",
};

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, initialState);

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/20">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-serif text-center">Admin Access</CardTitle>
                    <CardDescription className="text-center">Enter your access code to continue.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="code">Access Code</Label>
                            <Input id="code" name="code" type="password" required placeholder="••••••••" />
                        </div>
                        {state?.error && <p className="text-sm text-destructive text-center">{state.error}</p>}
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Verifying..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
