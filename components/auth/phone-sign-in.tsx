"use client"

import { useState } from "react"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import countries from "world-countries"

// Format countries data
const formattedCountries = countries
  .map((country) => ({
    name: country.name.common,
    flag: country.flag,
    code: country.cca2,
    dial_code: country.idd.root + (country.idd.suffixes?.[0] || ""),
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

interface PhoneSignInProps {
  mode?: 'signin' | 'signup'
}

export function PhoneSignIn({ mode = 'signin' }: PhoneSignInProps) {
  const [open, setOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countryCode, setCountryCode] = useState("US")

  const selectedCountry = formattedCountries.find(c => c.code === countryCode)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the phone verification process
    // For example, sending an OTP
    console.log("Phone number:", phoneNumber)
    console.log("Country code:", countryCode)
  }

  const isSignUp = mode === 'signup'

  return (
    <>
      <Button variant="outline" className="w-full" onClick={() => setOpen(true)}>
        <Phone className="mr-2 h-4 w-4" />
        {isSignUp ? 'Sign up with Phone' : 'Sign in with Phone'}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isSignUp ? 'Sign up with Phone' : 'Sign in with Phone'}
            </DialogTitle>
            <DialogDescription>
              Enter your phone number to receive a verification code
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={countryCode}
                onValueChange={setCountryCode}
              >
                <SelectTrigger id="country" className="w-full">
                  <SelectValue>
                    {selectedCountry && (
                      <span className="flex items-center gap-2">
                        <span>{selectedCountry.flag}</span>
                        <span>{selectedCountry.name}</span>
                      </span>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-[300px]">
                    {formattedCountries.map((country) => (
                      <SelectItem 
                        key={country.code} 
                        value={country.code}
                        className="flex items-center gap-2"
                      >
                        <span className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                          <span className="text-muted-foreground ml-auto">
                            {country.dial_code}
                          </span>
                        </span>
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex gap-2">
                <div className="w-20 shrink-0">
                  <Input
                    disabled
                    value={selectedCountry ? `${selectedCountry.flag} ${selectedCountry.dial_code}` : ""}
                    className="text-center"
                  />
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              Send Code
            </Button>
          </form>
          
          <DialogFooter className="sm:justify-center">
            <div className="text-center text-sm text-muted-foreground">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <Link 
                    href="/login" 
                    className="text-pink-500 hover:text-pink-600 font-medium"
                    onClick={() => setOpen(false)}
                  >
                    Sign in
                  </Link>
                </>
              ) : (
                <>
                  Dont have an account?{" "}
                  <Link 
                    href="/signup" 
                    className="text-pink-500 hover:text-pink-600 font-medium"
                    onClick={() => setOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
} 