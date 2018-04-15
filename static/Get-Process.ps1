try {
    $currentSessionId = (Get-Process -PID $pid).SessionID
    $out = Invoke-Command {
    $owners = @{}
    gwmi win32_process |% {$owners[$_.handle] = $_.getowner().user}
    Get-Process |
    Where-Object {$_.SessionId -eq $currentSessionId} |
    Select-Object   @{Name='Name';     Expr={$_.Name}},
                    @{Name='StartTime';     Expr={[string]$_.StartTime}},
                    @{Name='Responding';     Expr={[string]$_.Responding}},
                    @{Name='Owner';     Expr={$owners[$_.id.tostring()]}},
                    @{Name='Id';     Expr={$_.Id}}

    }
} catch [System.Management.Automation.RuntimeException] {
    $myError = @{
        Message = $_.Exception.Message
        Type = $_.FullyQualifiedErrorID
    }
    $out = @{ Error = $myError }
}

ConvertTo-Json $out -Compress