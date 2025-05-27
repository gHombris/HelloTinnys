"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Play,
  RotateCcw,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronDown,
  Search,
  Settings,
  Clock,
  CheckCircle,
  XCircle,
  Circle,
} from "lucide-react"

export default function Component() {
  const [selectedTest, setSelectedTest] = useState("should display todo text")
  const [expandedFiles, setExpandedFiles] = useState(new Set(["tests/example.spec.ts"]))
  const [watchMode, setWatchMode] = useState(false)

  const toggleFileExpansion = (file: string) => {
    const newExpanded = new Set(expandedFiles)
    if (newExpanded.has(file)) {
      newExpanded.delete(file)
    } else {
      newExpanded.add(file)
    }
    setExpandedFiles(newExpanded)
  }

  const testFiles = [
    {
      name: "tests/example.spec.ts",
      tests: [
        { name: "should display todo text", status: "passed", duration: "2.1s" },
        { name: "should allow me to add todo items", status: "passed", duration: "1.8s" },
        { name: "should allow me to edit todo items", status: "failed", duration: "0.9s" },
        { name: "should allow me to delete todo items", status: "skipped", duration: "-" },
      ],
    },
    {
      name: "tests/auth.spec.ts",
      tests: [
        { name: "should login with valid credentials", status: "passed", duration: "3.2s" },
        { name: "should show error with invalid credentials", status: "passed", duration: "1.5s" },
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "skipped":
        return <Circle className="w-4 h-4 text-gray-400" />
      default:
        return <Circle className="w-4 h-4 text-gray-400" />
    }
  }

  const actions = [
    { time: "0:00.123", action: "navigate", locator: "page", description: "Navigate to http://localhost:3000" },
    { time: "0:01.456", action: "click", locator: "[data-testid='new-todo']", description: "Click input field" },
    { time: "0:01.789", action: "fill", locator: "[data-testid='new-todo']", description: "Fill 'Buy groceries'" },
    { time: "0:02.012", action: "press", locator: "[data-testid='new-todo']", description: "Press 'Enter'" },
    { time: "0:02.345", action: "expect", locator: "[data-testid='todo-item']", description: "Expect to be visible" },
  ]

  return (
    <div className="flex h-screen bg-[#1e1e1e] text-white">
      {/* Sidebar */}
      <div className="w-80 bg-[#252526] border-r border-[#3e3e42] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#3e3e42]">
          <div className="flex items-center gap-2 mb-3">
            <Button size="sm" variant="ghost" className="text-white hover:bg-[#3e3e42]">
              <Play className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-white hover:bg-[#3e3e42]">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-[#3e3e42]"
              onClick={() => setWatchMode(!watchMode)}
            >
              {watchMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
            <div className="ml-auto">
              <Button size="sm" variant="ghost" className="text-white hover:bg-[#3e3e42]">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="relative mb-3">
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Filter tests..."
              className="pl-8 bg-[#3c3c3c] border-[#3e3e42] text-white placeholder:text-gray-400"
            />
          </div>

          <div className="flex gap-1">
            <Badge variant="secondary" className="bg-green-600 text-white">
              4 passed
            </Badge>
            <Badge variant="secondary" className="bg-red-600 text-white">
              1 failed
            </Badge>
            <Badge variant="secondary" className="bg-gray-600 text-white">
              1 skipped
            </Badge>
          </div>
        </div>

        {/* Test Files */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {testFiles.map((file) => (
              <div key={file.name} className="mb-2">
                <div
                  className="flex items-center gap-1 p-2 hover:bg-[#3e3e42] rounded cursor-pointer"
                  onClick={() => toggleFileExpansion(file.name)}
                >
                  {expandedFiles.has(file.name) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <span className="text-sm">{file.name}</span>
                  <Button size="sm" variant="ghost" className="ml-auto p-1 h-6 w-6">
                    <Play className="w-3 h-3" />
                  </Button>
                </div>

                {expandedFiles.has(file.name) && (
                  <div className="ml-4">
                    {file.tests.map((test) => (
                      <div
                        key={test.name}
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-[#3e3e42] ${
                          selectedTest === test.name ? "bg-[#094771]" : ""
                        }`}
                        onClick={() => setSelectedTest(test.name)}
                      >
                        {getStatusIcon(test.status)}
                        <span className="text-sm flex-1">{test.name}</span>
                        <span className="text-xs text-gray-400">{test.duration}</span>
                        <Button size="sm" variant="ghost" className="p-1 h-6 w-6">
                          <Play className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Timeline */}
        <div className="h-16 bg-[#252526] border-b border-[#3e3e42] p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-400">Timeline</span>
            <Badge variant="outline" className="text-xs">
              {selectedTest}
            </Badge>
          </div>
          <div className="relative h-4 bg-[#3c3c3c] rounded">
            <div className="absolute inset-y-0 left-0 w-1/4 bg-blue-500 rounded-l"></div>
            <div className="absolute inset-y-0 left-1/4 w-1/4 bg-green-500"></div>
            <div className="absolute inset-y-0 left-2/4 w-1/4 bg-yellow-500"></div>
            <div className="absolute inset-y-0 left-3/4 w-1/4 bg-purple-500 rounded-r"></div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="actions" className="flex-1 flex flex-col">
          <TabsList className="bg-[#252526] border-b border-[#3e3e42] rounded-none h-12 p-0">
            <TabsTrigger value="actions" className="data-[state=active]:bg-[#094771] text-white">
              Actions
            </TabsTrigger>
            <TabsTrigger value="call" className="data-[state=active]:bg-[#094771] text-white">
              Call
            </TabsTrigger>
            <TabsTrigger value="log" className="data-[state=active]:bg-[#094771] text-white">
              Log
            </TabsTrigger>
            <TabsTrigger value="errors" className="data-[state=active]:bg-[#094771] text-white">
              Errors
            </TabsTrigger>
            <TabsTrigger value="console" className="data-[state=active]:bg-[#094771] text-white">
              Console
            </TabsTrigger>
            <TabsTrigger value="network" className="data-[state=active]:bg-[#094771] text-white">
              Network
            </TabsTrigger>
            <TabsTrigger value="source" className="data-[state=active]:bg-[#094771] text-white">
              Source
            </TabsTrigger>
          </TabsList>

          <TabsContent value="actions" className="flex-1 p-0 m-0">
            <div className="flex h-full">
              {/* Actions List */}
              <div className="w-1/2 border-r border-[#3e3e42]">
                <ScrollArea className="h-full">
                  <div className="p-4">
                    {actions.map((action, index) => (
                      <Card
                        key={index}
                        className="mb-2 bg-[#2d2d30] border-[#3e3e42] hover:bg-[#3e3e42] cursor-pointer"
                      >
                        <div className="p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-xs text-gray-400">{action.time}</span>
                            <Badge variant="outline" className="text-xs">
                              {action.action}
                            </Badge>
                          </div>
                          <div className="text-sm font-mono text-blue-300 mb-1">{action.locator}</div>
                          <div className="text-sm text-gray-300">{action.description}</div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* DOM Snapshot */}
              <div className="w-1/2 bg-[#1e1e1e] flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="w-16 h-16 bg-[#3e3e42] rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Eye className="w-8 h-8" />
                  </div>
                  <p>DOM Snapshot</p>
                  <p className="text-sm">Select an action to view the page state</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="call" className="flex-1 p-4">
            <div className="text-gray-400">Call information will be displayed here</div>
          </TabsContent>

          <TabsContent value="log" className="flex-1 p-4">
            <div className="text-gray-400">Test logs will be displayed here</div>
          </TabsContent>

          <TabsContent value="errors" className="flex-1 p-4">
            <div className="text-gray-400">Error details will be displayed here</div>
          </TabsContent>

          <TabsContent value="console" className="flex-1 p-4">
            <div className="text-gray-400">Console output will be displayed here</div>
          </TabsContent>

          <TabsContent value="network" className="flex-1 p-4">
            <div className="text-gray-400">Network requests will be displayed here</div>
          </TabsContent>

          <TabsContent value="source" className="flex-1 p-4">
            <div className="text-gray-400">Source code will be displayed here</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
